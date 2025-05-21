# ec2-instance-id

A minimal web service designed to be run on AWS EC2 instances. It simply returns the instance ID which the service is running on.

## Usage

Use the following script to install and run the service as User Data for the EC2 instance.

```bash
#!/bin/bash
dnf update -y
dnf install -y git

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

git clone https://github.com/aelitneg/ec2-instance-id.git
npm --prefix ./ec2-instance-id run start
```
