variable "resource_group_name" {
  description = "The name of the resource group in which resources are created"
  default     = "digital-hybrid-rg"
  type        = string
}

variable "location" {
  description = "Location of the resource group"
  default     = "West Europe"
  type        = string
}