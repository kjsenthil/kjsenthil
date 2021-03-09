variable "resource_group_name" {
  description = "The name of the resource group in which resources are created"
  default     = "digital-hybrid-backend"
  type        = string
}

variable "location" {
  description = "Location of the resource group"
  default     = "West Europe"
  type        = string
}

variable "publisher_name" {
  type        = string
  default     = "aflalasker"
  description = "Publisher name for the API"
}
variable "publisher_email" {
  type        = string
  default     = "aflal.asker@dmwgroup.co.uk"
  description = "Publisher email for the API"
}

variable "api_management_sku_name" {
  type        = string
  default     = "Developer_1"
  description = "API management sku name"
}

variable "api_management_name" {
  type        = string
  default     = "digital-hybrid"
  description = "API management name"
}

variable "environment" {
  type        = string
  description = "The environment in which this api management service is deployed."
}