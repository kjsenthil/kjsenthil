variable "environment_prefix" {
  type        = string
  description = "The name of the environment to deploy the resource."
}

variable "git_branch_name" {
  type        = string
  description = "Name of the Git branch, used as a tag on resources"
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

variable "features_function_app_code_path" {
  type        = string
  default     = "./zips/features.zip"
  description = "Path to the function app code."
}

variable "returns_function_app_code_path" {
  type        = string
  default     = "./zips/returns.zip"
  description = "Path to the returns function app code."
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

variable "gtm_env_auth" {
  type        = string
  description = "Environment auth identifier (not a secret) for Google Tag Manager found in the GTM admin console."
}

variable "gtm_env_preview" {
  type        = string
  description = "Environment preview identifier (not a secret) for Google Tag Manager found in the GTM admin console."
}

variable "apim_name" {
  type        = string
  description = "Name of the APIM to use for this deployment to create APIs in"
}

variable "apim_vnet_name" {
  type        = string
  description = "Name of the VNet which houses the APIM instance to connect to"
}

variable "apim_subnet_name" {
  type        = string
  description = "Name of the subnet which houses the APIM instance to connect to"
}

variable "cdn_profile_website_name" {
  type        = string
  description = "Name of the CDN profile to create endpoints on for the website"
}

variable "cdn_profile_storybook_name" {
  type        = string
  description = "Name of the CDN profile to create endpoints on for storybook"
}

variable "app_insights_name" {
  type        = string
  description = "name of the Application insights"
}

variable "public_dns_zone_name" {
  type        = string
  description = "The name of the public DNS zone"
}

variable "dns_resource_group_name" {
  type        = string
  description = "Resource group that hosts the public DNS zone"
}
