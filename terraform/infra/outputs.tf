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

output "endpoints" {
  value       = local.endpoints
  description = "All the available API endpoints."
}
