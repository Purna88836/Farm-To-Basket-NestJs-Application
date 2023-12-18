resource "null_resource" "db_remote" {
  connection {
    type        = "ssh"
    user        = "ec2-user"
    private_key = var.my_public_key
    host        = aws_instance.db_instance.public_ip
    timeout     = "4m"
  }
  provisioner "remote-exec" {
    inline = [
      "sudo dnf update",
      "sudo dnf install postgresql15.x86_64 postgresql15-server",
      "sudo postgresql-setup --initdb",
      "sudo systemctl start postgresql",
      "sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'postgres';\"",
      "sudo -u postgres createdb farmtobasketnestjs",
      "echo \"listen_addresses = '*' \" | sudo tee -a /var/lib/pgsql/data/postgresql.conf",
      "echo \"host all all 0.0.0.0/0 md5\" | sudo tee -a /var/lib/pgsql/data/pg_hba.conf",
      "sudo systemctl reload postgresql"
    ]
  }
}