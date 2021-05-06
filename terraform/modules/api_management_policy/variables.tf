variable "apima_name" {
  type        = string
  description = "The name of the API to attach this operations to."
}

variable "apim_name" {
  type        = string
  description = "The name of the APIM."
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group to create this operation."
}

variable "xml_policy_file" {
  type        = string
  description = "Path to XML policy document."
}

variable "operation_id" {
  type        = string
  description = "API operation id to attach the policy to."
}
