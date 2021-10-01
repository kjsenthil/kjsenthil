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

variable "tags" {
  type        = map(string)
  description = "Tags to add to all resources"
  default     = {}
}
