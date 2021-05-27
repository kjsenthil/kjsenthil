variable "environment_prefix" {
  type        = string
  description = "The name of the environment to deploy the resource."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}

variable "app_name" {
  type        = string
  default     = "digital-hybrid"
  description = "The name of the application."
}

variable "resource_group_name" {
  type        = string
  description = "The resource group to deploy the resource."
}

variable "api_management_sku_name" {
  type        = string
  description = "SKU to start APIM with. Must match a valid APIM SKU from MS docs"
}

variable "location" {
  type        = string
  description = "Azure location to deploy resources into. Must be either 'uksouth' or 'ukwest'"
}

variable "vnet_cidr" {
  type        = string
  description = "CIDR block to assign to the APIM VNet"
}

variable "myaccount_signing_key" {
  type        = string
  description = "my accounts accesskey signing key"
  sensitive   = true
}

variable "xplan_app_id" {
  type        = string
  description = "xplan Application Id"
}

variable "xplan_username" {
  type        = string
  description = "xplan basic auth username"
}

variable "xplan_password" {
  type        = string
  description = "xplan basic auth password"
  sensitive   = true
}
