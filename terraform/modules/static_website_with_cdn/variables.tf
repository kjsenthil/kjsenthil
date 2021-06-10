variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}

variable "storage_account_name" {
  type        = string
  description = "The name for the static website hosting storage account."
}

variable "resource_group_name" {
  type        = string
  description = "The name of the Resource group to deploy the storage account."
}

variable "location" {
  type        = string
  description = "The Azure location to deploy the Storage Account."
}

variable "account_kind" {
  type        = string
  description = "The Storage Account kind."
}

variable "account_tier" {
  type        = string
  description = "The storage account tier."
}

variable "account_replication_type" {
  type        = string
  description = "The replication type for the storage account."
}

variable "cdn_profile_name" {
  type        = string
  description = "Name of the CDN profile to create the endpoint in"
}

variable "enable_https_traffic_only" {
  type        = bool
  default     = true
  description = "Should the storage account only allow https traffic?"
}

variable "index_path" {
  type        = string
  default     = "index.html"
  description = "The path to the index.html page."
}

variable "error_path" {
  type        = string
  default     = "error.html"
  description = "The path to the error.html page."
}

variable "csp_allowed_script_sources" {
  type        = string
  description = "Any allowed 'script-src' directives to be added to the CSP header in the CDN rules"
  default     = "'self'"
}

variable "csp_allowed_style_sources" {
  type        = string
  description = "Any allowed 'style-src' directives to be added to the CSP header in the CDN rules"
  default     = "'self'"
}
