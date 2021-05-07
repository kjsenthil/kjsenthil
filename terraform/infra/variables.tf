variable "environment_prefix" {
  type        = string
  description = "The name of the environment to deploy the resource."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}

variable "projections_function_app_code_path" {
  type        = string
  default     = "./zips/projections.zip"
  description = "Path to the function app code."
}

variable "app_name" {
  type        = string
  default     = "digital-hybrid"
  description = "The name of the application."
}

variable "resource_group_name" {
  type        = string
  description = "The of the resource group to deploy the resource."
}

variable "location" {
  type        = string
  description = "Azure location to deploy resources into. Must be either 'uksouth' or 'ukwest'"
}

variable "apim_name" {
  type        = string
  description = "Name of the APIM to use for this deployment to create APIs in"
}

variable "apim_subnet_id" {
  type        = string
  description = "ID of the subnet which houses the APIM instance to connect to"
}
