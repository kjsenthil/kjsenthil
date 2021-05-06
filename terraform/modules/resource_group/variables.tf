variable "resource_group_name" {
  description = "The name of the resource group in which resources are created."
  type        = string
}

variable "location" {
  description = "Location of the resource group."
  type        = string
}

variable "environment" {
  type        = string
  description = "The environment utilising this resource group."
}
