# Outputs from the APIO module. 
output "apio_url_template" {
  value = values(azurerm_api_management_api_operation.api_operation).*.url_template
}

output "apio_operation_id" {
  value = values(azurerm_api_management_api_operation.api_operation).*.operation_id
}

# The path from the APIA data module. 
output "apia_path" {
  value = data.azurerm_api_management_api.pr_apia.path
}

# Outputs from the remote data source. These are the from the APIM module.
output "dev_apim_gateway_url" {
  value       = data.terraform_remote_state.dev_apim.outputs.dev_apim_gateway_url
  description = "The gateway url of the dev APIM."
}

output "dev_apim_name" {
  value       = data.terraform_remote_state.dev_apim.outputs.dev_apim_name
  description = "The name of the dev APIM."
}

output "dev_apim_rg" {
  value       = data.terraform_remote_state.dev_apim.outputs.dev_apim_rg
  description = "The rg name of the dev APIM."
}

# Alll available API endpoints as JSON encoded
output "endpoints" {
  value       = local.endpoints
  description = "All the available API endpoints."
}


output "frontend_storage_account_name" {
  value       = azurerm_storage_account.front_end_storage_account.name
  description = "Name of the storage account hosting the front end."
}


output "frontend_web_endpoint" {
  value       = azurerm_storage_account.front_end_storage_account.primary_web_endpoint
  description = "Web enpoint for the front end."
}

output "storybook_storage_account_name" {
  value       = azurerm_storage_account.storybook_storage_account.name
  description = "Name of the storage account hosting the storybook."
}

output "storybook_web_endpoint" {
  value       = azurerm_storage_account.storybook_storage_account.primary_web_endpoint
  description = "Web enpoint for the storybook."
}
