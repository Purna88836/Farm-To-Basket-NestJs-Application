terraform {
  backend "s3" {
    bucket         = "terraform-st-track1"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"  # Change to your desired AWS region
}

resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "subnet_a" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"  # Change to your desired availability zone
  map_public_ip_on_launch = true
}

resource "aws_subnet" "subnet_b" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"  # Change to your desired availability zone
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "Internet_Gateway_vpc" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "Internet_Gateway_vpc"
  }
}

resource "aws_route_table" "Public_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.Internet_Gateway_vpc.id
  }


  tags = {
    Name = "POC_Public_route_table"
  }
}

resource "aws_route_table_association" "POC_Public" {
  subnet_id      = aws_subnet.subnet_a.id
  route_table_id = aws_route_table.Public_route_table.id
}

resource "aws_security_group" "Security_Group_web_access" {
  name        = "Security_Group_web_access"
  description = "Allow TLS inbound traffic"
  vpc_id = aws_vpc.my_vpc.id

  ingress {
    description = "Port 80 from VPC to connect application"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    description = "Port 22 from VPC to connect instance"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Port 5432 for postgresql database"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = {
    Name = "Security_Group_web_access"
  }
}