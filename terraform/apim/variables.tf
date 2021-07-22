variable "environment_prefix" {
  type        = string
  description = "The name of the environment to deploy the resource."
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Non default tags for the resource."
}

variable "app_name" {
  type        = string
  default     = "digital-hybrid"
  description = "The name of the application."
}

variable "resource_group_name" {
  type        = string
  description = "The resource group to deploy the resource."
}

variable "api_management_sku_name" {
  type        = string
  description = "SKU to start APIM with. Must match a valid APIM SKU from MS docs"
}

variable "location" {
  type        = string
  description = "Azure location to deploy resources into. Must be either 'uksouth' or 'ukwest'"
}

variable "vnet_cidr" {
  type        = string
  description = "CIDR block to assign to the APIM VNet"
}

variable "myaccount_signing_key" {
  type        = string
  description = "my accounts accesskey signing key"
  sensitive   = true
}

variable "xplan_app_id" {
  type        = string
  description = "xplan Application Id"
}

variable "xplan_username" {
  type        = string
  description = "xplan basic auth username"
}

variable "xplan_password" {
  type        = string
  description = "xplan basic auth password"
  sensitive   = true
}

variable "private_dns_zone" {
  type        = string
  description = "The private DNS Zone for the APIM."
}

variable "public_dns_zones" {
  type = list(object({
    public_dns_parent_zone = string
    public_dns_child_zones = list(string)
  }))
  description = "The public DNS zone object containing parent and child DNS subzone for the subscription"
}

variable "dns_a_records" {
  type        = list(string)
  description = "The records to associate with the A record."
}

# variable "myaccounts_ip_address" {
#   type        = string
#   description = "The IP address of MyAccounts."
# }

variable "sg_rules" {
  type = list(object({
    name                       = string
    description                = string
    priority                   = number
    direction                  = string
    access                     = string
    protocol                   = string
    source_address_prefix      = string
    source_port_range          = string
    destination_address_prefix = string
    destination_port_range     = number
  }))
  description = "The environment specific sg rules to be added to the security group."
}

variable "slack_security_alert_webhook_url" {
  type        = string
  description = "slack security alert web hook url"
  sensitive   = true
}
