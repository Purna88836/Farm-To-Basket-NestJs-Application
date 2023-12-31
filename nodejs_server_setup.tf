resource "null_resource" "remote2" {
  connection {
    type        = "ssh"
    user        = "ec2-user"
    private_key = var.my_public_key
    host        = aws_instance.instance.public_ip
    timeout     = "4m"
  }
  provisioner "remote-exec" {
    inline = [
      "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash",
      ". ~/.nvm/nvm.sh",
      "nvm install 20",
      "npm install -g pm2",
      "npm install -g npm@10.2.5",
      "sudo mkdir -p /var/www/farm-to-basket",
      "sudo chmod 777 /var/www/farm-to-basket"
    ]
  }

  provisioner "file" {
    source      = "./ecosystem.config.js"
    destination = "/var/www/farm-to-basket/ecosystem.config.js"
  }
}