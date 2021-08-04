variable "resource_group_name" {
  description = "The name of the resource group in which resources are created."
  type        = string
}

variable "location" {
  description = "Location of the resource group."
  type        = string
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}

variable "principal_id" {
  type        = string
  description = "system assigned principal_id of APIM"
}

variable "short_location" {
  type        = string
  description = "short location of the resource."
}

variable "environment_prefix" {
  type        = string
  description = "The name of the environment to deploy the resource."
}

variable "slack_security_alert_webhook_url" {
  type        = string
  description = "slack security alert web hook url"
  sensitive   = true
}

variable "log_analytics_workspace_id" {
  type        = string
  description = "id of log analytics workspace"
}

variable "virtual_network_id" {
  type        = string
  description = "id of virtual network"
}

variable "private_link_subnet_id" {
  type        = string
  description = "id of private link subnet"
}
