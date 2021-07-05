variable "public_dns_parent_zone" {
  type        = string
  description = "The public DNS Zone for the subscription."
}

variable "public_dns_child_zones" {
  type        = list(string)
  description = "The public DNS Subzone list for the subscription, child to the public DNS zone"
}

variable "resource_group_name" {
  type        = string
  description = "The resource group name"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}