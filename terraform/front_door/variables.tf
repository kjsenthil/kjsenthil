variable "environment_prefix" {
  type        = string
  description = "The name of the environment to deploy the resource"
}

variable "resource_group_name" {
  type        = string
  description = "The resource group to deploy the resource"
}

variable "cdn_endpoint_host" {
  type        = string
  description = "CDN endpoint to use as the backend for the front door"
}

variable "public_dns_zone_name" {
  type        = string
  description = "DNS Zone to create the CNAME record in"
}

variable "tags" {
  type        = map(string)
  description = "Tags to add to all resources"
  default     = {}
}
