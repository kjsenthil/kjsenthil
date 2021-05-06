variable "resource_group_name" {
  description = "The name of the resource group in which resources are created"
  type        = string
}

variable "location" {
  description = "Location of the resource group"
  type        = string
}

variable "publisher_name" {
  type        = string
  default     = "digitalhybrid"
  description = "Publisher name for the API"
}
variable "publisher_email" {
  type        = string
  default     = "digitalhybrid@credera.co.uk"
  description = "Publisher email for the API"
}

variable "api_management_sku_name" {
  type        = string
  description = "API management sku name"
}

variable "name" {
  type        = string
  description = "The name of the APIM."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}
