variable "storage_account_name" {
  type        = string
  description = "Storage account to create"
}

variable "containers" {
  type        = list(string)
  description = "List of containers to create"
}

variable "environment" {
  type        = string
  description = "Environment to provision the resources in"
}

variable "location" {
  type        = string
  description = "Azure location to deploy resources into. Must be either 'UK South' or 'UK West'"
}
