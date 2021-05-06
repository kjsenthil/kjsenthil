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

variable "operation_id" {
  type        = string
  description = "The name of the APIM."
}

variable "display_name" {
  type        = string
  description = "The name of the APIM."
}

variable "method" {
  type        = string
  description = "The name of the APIM."
}

variable "url_template" {
  type        = string
  description = "The name of the APIM."
}

variable "description" {
  type        = string
  description = "The name of the APIM."
}

variable "path_params" {
  type        = list(any)
  default     = []
  description = "Path params to create template parameters."
}

variable "is_mock" {
  type        = bool
  default     = false
  description = "Does this operation return a mocked response?"
}

variable "mock_data_type" {
  type        = string
  default     = "application/json"
  description = "The data type for the mocked response."
}

variable "mock_sample" {
  type        = string
  default     = ""
  description = "The mocked response to be returned."
}



