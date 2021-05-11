variable "name" {
  type        = string
  description = "The name of the key vault."
}

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

