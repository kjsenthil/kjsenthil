output "apim_gateway_url" {
  value       = data.azurerm_api_management.apim.gateway_url
  description = "The gateway URL for the APIM."
}

output "frontend_web_endpoint" {
  value       = module.front_end.web_endpoint
  description = "The Gatsby App web endpoint."
}

output "storybook_web_endpoint" {
  value       = var.environment_prefix != "staging" ? module.storybook[0].web_endpoint : null
  description = "The storybook web endpoint."
}

output "frontend_storage_account_name" {
  value       = module.front_end.name
  description = "Name of the storage account hosting the Gatsby App."
}

output "storybook_storage_account_name" {
  value       = var.environment_prefix != "staging" ? module.storybook[0].name : null
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

output "myaccounts_home_url" {
  value       = "https://my.demo2.bestinvest.co.uk/dashboard"
  description = "My Accounts Home Page"
}

output "gtm_env_auth" {
  value       = var.gtm_env_auth
  description = "Environment auth identifier for Google Tag Manager"
}

output "gtm_env_preview" {
  value       = var.gtm_env_preview
  description = "Environment preview identifier for Google Tag Manager"
}

output "app_conf_keys" {
  value = azurerm_app_configuration.app_config.primary_read_key
}
