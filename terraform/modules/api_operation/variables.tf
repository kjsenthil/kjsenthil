variable "operation_id" {
  type        = string
  description = "An ID for the API operation. Usually, the name of the operation with method prefixed."
}

variable "api_name" {
  type        = string
  description = "The name of the API to attach the API operation to."
}

variable "api_management_name" {
  type        = string
  description = "The name of the API management service to attach to."
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group to deploy the API operation in."
}

variable "display_name" {
  type        = string
  description = "A display name for the API operation."
}

variable "method" {
  type        = string
  description = "The HTTP method supported by the API operation."
}

variable "url_template" {
  type        = string
  description = "The url to access the API operation. This is appended to the APIM base URL."
}

variable "description" {
  type        = string
  description = "A description for the API operation."
}