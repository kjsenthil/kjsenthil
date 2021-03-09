variable "environment" {
  type        = string
  description = "The environment to deploy the APIM in."
}

variable "is_apim" {
  type        = bool
  default     = true
  description = "If set to true, deploys one instance of APIM in the specified environment and a RG."
}

variable "is_apima" {
  type        = bool
  default     = true
  description = "If set to true, deploys one instance of APIMA in the specified environment and a RG."
}

variable "environment_prefix" {
  type        = string
  description = "The substring from the PR to prefix the api with."
}

variable "apim_name" {
  type        = string
  description = "API management name"
}

variable "rg_name" {
  description = "The name of the resource group in which resources are created."
  type        = string
}