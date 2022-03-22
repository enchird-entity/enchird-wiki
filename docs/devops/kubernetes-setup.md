---
sidebar_position: 1
title: Kubernetes setup
---

# Setup of the test Kubernetes cluster.

> ### Disclaimer
>This was done with:
>- Ubuntu 16.04.6 LTS
>- Linux 4.4.0-142-generic x86_64
>- Docker version 20.10.7, build f0df350
>- Kubeadm Version
>  ```bash
>  kubeadm version: &version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.5", GitCommit:"c285e781331a3785a7f436042c65c5641ce8a9e9", >GitTreeState:"clean", BuildDate:"2022-03-16T15:57:37Z", GoVersion:"go1.17.8", Compiler:"gc", Platform:"linux/amd64"}
>  ```
>- kubectl version
>  ```bash
>  Client Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.5", GitCommit:"c285e781331a3785a7f436042c65c5641ce8a9e9", GitTreeState:"clean", BuildDate:"2022-03-16T15:58:47Z", GoVersion:"go1.17.8", Compiler:"gc", Platform:"linux/amd64"}
>  Server Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.5", GitCommit:"c285e781331a3785a7f436042c65c5641ce8a9e9", GitTreeState:"clean", BuildDate:"2022-03-16T15:52:18Z", GoVersion:"go1.17.8", Compiler:"gc", Platform:"linux/amd64"}
>  ```
>If your setup does not correspond to these versions, this documentation might not work. In that case, please refer to the official Kubernetes documentation for settting up a production cluster.

## Requirements
Before beginning, the following requirements for the nodes should be satisfied: 
- A compatible Linux host. The Kubernetes project provides generic instructions for Linux distributions based on Debian and Red Hat, and those distributions without a package manager.
- 2 GB or more of RAM per machine (any less will leave little room for your apps).
- 2 CPUs or more.
- Full network connectivity between all machines in the cluster (public or private network is fine).
- Unique hostname, MAC address, and product_uuid for every node. See here for more details.
- Certain ports are open on your machines. See here for more details.
- Swap disabled. You MUST disable swap in order for the kubelet to work properly.

## Container runtimes
You need to install a container runtime into each node in the cluster so that Pods can run there.

Follow the instructions on the official Docker documentation to install the Docker Engine on the nodes for the cluster.

## Disabling the swap
We will have to disable the swap on all the nodes. This is done by first running the command, to disable the swap:
```s
swapoff -a
```

Then modify the file located at `/etc/fstab` and comment the file with the swap to get something similar to the output below:
```s
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
/dev/mapper/kube--test--master--1--vg-root /               ext4    errors=remount-ro 0       1
# /boot was on /dev/sda1 during installation
UUID=e9a0fd24-129d-4362-acb1-c9bf100bce60 /boot           ext2    defaults        0       2
#/dev/mapper/kube--test--master--1--vg-swap_1 none            swap    sw              0       0
```


## Preparing the master machine.
The VMs created with Promox already satisfy the first five requirements.

### Letting iptables see bridged traffic
Make sure that the `br_netfilter` module is loaded. This can be done by running `lsmod | grep br_netfilter`. To load it explicitly call `sudo modprobe br_netfilter`

As a requirement for your Linux Node's iptables to correctly see bridged traffic, you should ensure `net.bridge.bridge-nf-call-iptables` is set to 1 in your `sysctl` config, e.g.
```s
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF

sudo sysctl --system
```

### Installing runtime
You will install these packages on all of your machines:

- `kubeadm`: the command to bootstrap the cluster.

- `kubelet`: the component that runs on all of the machines in your cluster and does things like starting pods and containers.

- `kubectl`: the command line util to talk to your cluster.

1. Update the apt package index and install packages needed to use the Kubernetes apt repository:
```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```
2. Download the Google Cloud public signing key:
```
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
```
3. Add the Kubernetes apt repository:
```
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```
4. Update apt package index, install kubelet, kubeadm and kubectl, and pin their version:
```
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

## Initializing the control plane
The control-plane node is the machine where the control plane components run, including etcd (the cluster database) and the API Server (which the `kubectl` command line tool communicates with).

We would first need to specify the CGroup driver. Create a file called `kubeadm-config.yaml` and write the following contents:
```s
# kubeadm-config.yaml
kind: ClusterConfiguration
apiVersion: kubeadm.k8s.io/v1beta3
kubernetesVersion: v1.21.0
---
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
cgroupDriver: cgroupfs
```

To initialize the control-plane node run with the configuration file:
```s
sudo kubeadm init --config kubeadm-config.yaml
```

You will get a result as the one below:
```s
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.10.10.70:6443 --token znxbm6.ro1h1xpv69n3tpfb \
        --discovery-token-ca-cert-hash sha256:2c241d4aa1be5c06333338cd379dbaf46194d2371aa45804b566931cb8776860
```

## Deploying the pod network (Weavenet)
Weave Net can be installed onto your CNI-enabled Kubernetes cluster with a single command:

```s
$ kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

This configuration won’t enable encryption by default. If your data plane traffic isn’t secured that could allow malicious actors to access your pod network.

## Joining your nodes
The nodes are where your workloads (containers and Pods, etc) run. To add new nodes to your cluster do the following for each machine:
- SSH to the machine

- Become root (e.g. sudo su -)

- Install a runtime if needed

- Run the command that was output by kubeadm init. For example:

```s
kubeadm join --token <token> <control-plane-host>:<control-plane-port> --discovery-token-ca-cert-hash sha256:<hash>
```

If you do not have the token, you can get it by running the following command on the control-plane node:

```
kubeadm token list
```
The output is similar to this:

```
TOKEN                    TTL  EXPIRES              USAGES           DESCRIPTION            EXTRA GROUPS
8ewj1p.9r9hcjoqgajrj4gi  23h  2018-06-12T02:51:28Z authentication,  The default bootstrap  system:
                                                   signing          token generated by     bootstrappers:
                                                                    'kubeadm init'.        kubeadm:
                                                                                           default-node-token
```

By default, tokens expire after 24 hours. If you are joining a node to the cluster after the current token has expired, you can create a new token by running the following command on the control-plane node:

```s
kubeadm token create
```

The output is similar to this:

```
5didvk.d09sbcov8ph2amjw
```

If you don't have the value of --discovery-token-ca-cert-hash, you can get it by running the following command chain on the control-plane node:

```s
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | \
   openssl dgst -sha256 -hex | sed 's/^.* //'
```

The output is similar to:

```
8cb2de97839780a412b93877f8507ad6c94f73add17d5d7058e91741c9d5ec78
```

## Deploy and Access the kubernetes Dashboard
To protect your cluster data, Dashboard deploys with a minimal RBAC configuration by default. Currently, Dashboard only supports logging in with a Bearer Token.

### Deploy the Dashboard UI
The Dashboard UI is not deployed by default. To deploy it, run the following command:

```s
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml
```

### Configure Dashboard access
Edit the Kubernetes dashboard service created in the previous section using the `kubectl edit` command, as shown below. Running the below command will open an editable service configuration file displaying the service configuration.

```s
kubectl edit service/kubernetes-dashboard -n kubernetes-dashboard
```



Once the file is opened, change the type of service from `ClusterIP` to `NodePort` and save the file as shown below. By default, the service is only available internally to the cluster (`ClusterIP`) but changing to `NodePort` exposes the service to the outside.

In the below code snippet, the Kubernetes dashboard service is listening on TCP port 443 and maps TCP port 8443 from port 443 to the dashboard pod port TCP/8443.

```s
# Updated the type to NodePort in the service.
ports:
  port: 443 
  protocol: TCP
  targetPort: 8443
selector:
  k8s-app: kubernetes-dashboard
sessionAffinity: None
type: NodePort 
```

Next, delete the Kubernetes dashboard pod using the name found in step three using the `kubectl delete` command. Find the exact name of this pod by using the `kubectl get pods --all-namespaces` command.

```s
kubectl delete pod kubernetes-dashboard-546cbc58cd-7ggc6 -n kubernetes-dashboard
```

> Whenever you modify the service type, you must delete the pod. Once deleted, Kubernetes will create a new one for you with the updated service type to access the entire network.

Verify the kubernetes-dashboard service has the correct type by running the `kubectl get svc --all-namespace` command. You will now notice that the service type has changed to NodePort, and the service exposes the pod’s internal TCP port 30439 using the outside TCP port of 443.

```s
kubectl get svc --all-namespaces
```

### Creating the sample user.
#### Creating the Service Account.
Copy the following content to a `dashboard-adminuser.yaml` file.

```s
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

#### Creating the ClusterRoleBinding
In most cases after provisioning the cluster using kops, kubeadm or any other popular tool, the ClusterRole cluster-admin already exists in the cluster. We can use it and create only a ClusterRoleBinding for our ServiceAccount. If it does not exist then you need to create this role first and grant required privileges manually.

Copy the content in the same `dashboard-adminuser.yaml` separated by `---`:

```s
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

After the contents have been written, run `kubectl apply -f dashboard-adminuser.yaml` to apply the configurations.

#### Getting a bearer token
Now we need to find the token we can use to log in. Execute the following command:

```s
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```

It should print something like:

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxT3R3cnRzejlEanZublUySk1OSUhjUFZ6VHZqTzc3cGdOcy16Q2hfNVkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLXY2djV6Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI1ZWI4NjQ2OS0wMzViLTQxODUtYmQ3Ny1lMTI3MmVjY2EyMWMiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.gR0tRFilgLN0aJs8g9_thFN55vSaxd0BOBhaJBzerjTNFJ-cegiDZ0f3qLm4tWwazk_4921Ul5tjK-vp4Vr3jnqISL_0KC50XzAexdk_1vr0qxpGDR4V7SGu3EeihaVpBoEr743itrlL_YqwfpIpZPAzrL-QNAA0KEUWgCtFY3qrkvWvdirL0mQUiiKPokJwhkeGJUot9hzJIPPjWUBjeEaBCQsR5l9q1fucUG0LVG4DwntPxqQMVDCBbAHbndv0j5AY3XksMxStCawtdJH0_RoLUnedRO7X6QkbSYJXs0N8Mq0-bIhZ9sZKqnXCj6xR6HQezUBiuN46IfvqJIoU4w
```

