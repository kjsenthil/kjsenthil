output "url_template" {
  value = values(azurerm_api_management_api_operation.api_operation).*.url_template
}

output "prod_apim_gateway_url" {
  value = data.azurerm_api_management.prod_apim.gateway_url
}

output "prod_apia_path" {
  value = data.azurerm_api_management_api.prod_apia.path
}

output "endpoints" {
  value = local.endpoints
}

output "frontend_storage_account_name" {
  value       = azurerm_storage_account.front_end_storage_account.name
  description = "Name of the storage account hosting the front end."
}


output "frontend_web_endpoint" {
  value       = azurerm_storage_account.front_end_storage_account.primary_web_endpoint
  description = "Web enpoint for the front end."
}

output "resource_group_name" {
  value       = format("%s-%s-rg", local.environment, local.rg_name)
  description = "The name of the Staging environments resource group."
}
