variable "resource_group_name" {
  type        = string
  description = "Resource group to deploy function app into"
}

variable "location" {
  type        = string
  description = "Azure Location to deploy function app into. Must be in the same location as desired resource group"
}

variable "name" {
  type        = string
  description = "Name of the function app to be deployed"
}

variable "app_code_path" {
  type        = string
  description = "Local path to function app zip code"
}

variable "app_service_plan_id" {
  type        = string
  description = "The ID of the app service plan to deploy function app into"
}

variable "os_type" {
  type        = string
  description = "`linux` for Linux derivatives, or an `null` for Windows"
}

variable "tags" {
  description = "Tags to apply to resources created by this module"
  default     = {}
  type        = map(string)
}
