output "dev_apim_gateway_url" {
  value       = data.azurerm_api_management.dev_apim.gateway_url
  description = "The gateway url of the APIM deployed in the Development environment."
}

output "dev_apim_name" {
  value       = data.azurerm_api_management.dev_apim.name
  description = "The name of the APIM deployed in the Development environment."
}

output "dev_apim_rg" {
  value       = data.azurerm_api_management.dev_apim.resource_group_name
  description = "The name of the resource group the APIM is deployed in, in the Development environment."
}
