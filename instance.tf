resource "aws_instance" "instance" {
  ami             = "ami-02396cdd13e9a1257"
  instance_type   = "t2.micro"
  key_name        = "nodejs-app-test"
  vpc_security_group_ids = [aws_security_group.Security_Group_web_access.id]
  subnet_id       = aws_subnet.subnet_a.id
  tags = {
    Name = "Virtual_Nodejs_Server"
  }
}

resource "aws_instance" "db_instance" {
  ami             = "ami-02396cdd13e9a1257"
  instance_type   = "t2.micro"
  key_name        = "nodejs-app-test"
  vpc_security_group_ids = [aws_security_group.Security_Group_web_access.id]
  subnet_id       = aws_subnet.subnet_a.id
  tags = {
    Name = "Virtual_Database_Server"
  }
}

#instance