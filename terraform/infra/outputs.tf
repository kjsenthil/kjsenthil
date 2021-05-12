output "apim_gateway_url" {
  value       = data.azurerm_api_management.apim.gateway_url
  description = "The gateway URL for the APIM."
}

output "frontend_web_endpoint" {
  value       = module.static_website_storage_account.primary_web_endpoint
  description = "The Gatsby App web endpoint."
}

output "storybook_web_endpoint" {
  value       = var.environment_prefix != "staging" ? module.storybook_storage_account[0].primary_web_endpoint : null
  description = "The storybook web endpoint."
}

output "frontend_storage_account_name" {
  value       = module.static_website_storage_account.name
  description = "Name of the storage account hosting the Gatsby App."
}

output "storybook_storage_account_name" {
  value       = var.environment_prefix != "staging" ? module.storybook_storage_account[0].name : null
  description = "Name of the storage account hosting the storybook."
}

output "api_endpoints" {
  value       = jsonencode(local.api_endpoints)
  description = "All the resouces URLs that can be accessed from the base URL."
}

output "api_base_url" {
  value       = "${data.azurerm_api_management.apim.gateway_url}/${module.apima.path}"
  description = "A concat of the APIM gateway URL and the API path."
}

