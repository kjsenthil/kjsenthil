variable "name" {
  type        = string
  description = "description"
}


variable "resource_group_name" {
  type        = string
  description = "Resource group name to deploy this api in."
}

variable "revision" {
  type        = number
  default     = 1
  description = "The API revision."
}

variable "display_name" {
  type        = string
  description = "The display name of the API."
}

variable "path" {
  type        = string
  default     = "digitalhybrid"
  description = "The path for the API."
}

variable "protocols" {
  type        = list(string)
  default     = ["https"]
  description = "The suppported protocols by the API."
}

variable "subscription_required" {
  type    = bool
  default = false
}

variable "description" {
  type        = string
  description = "The description for the deployed API."
}

variable "api_management_name" {
  type        = string
  description = "API management name"
}

variable "api_management_logger_name" {
  type        = string
  description = "API management logger name"
}

variable "app_insights_id" {
  type        = string
  description = "Application insights id"
}

variable "app_insights_instrumentation_key" {
  type        = string
  description = "Application insights instrumentation key"
}

