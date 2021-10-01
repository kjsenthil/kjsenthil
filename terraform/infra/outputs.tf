output "apim_gateway_url" {
  value       = data.azurerm_api_management.apim.gateway_url
  description = "The gateway URL for the APIM."
}

output "frontend_web_endpoint" {
  value       = module.front_end.web_endpoint
  description = "The Gatsby App web endpoint."
}

output "frontend_cdn_endpoint_name" {
  value       = module.front_end.cdn_endpoint_name
  description = "The Gatsby App web CDN endpoint name."
}

output "frontend_web_cname" {
  value       = var.environment_prefix == "staging" || var.environment_prefix == "prod" ? coalesce("https://${trimsuffix(module.front_end.website_cname_record[0], ".")}", "") : null
  description = "The Gatsby App CNAME record."
}

output "frontend_web_host" {
  value       = module.front_end.web_host
  description = "The Gatsby app static web hostname"
}

output "frontend_static_web_url" {
  value       = "https://${module.front_end.web_host}"
  description = "The Gatsby App static web url."
}

output "storybook_web_endpoint" {
  value       = var.environment_prefix != "staging" ? module.storybook[0].web_endpoint : null
  description = "The storybook web endpoint."
}

output "storybook_cdn_endpoint_name" {
  value       = var.environment_prefix != "staging" ? module.storybook[0].cdn_endpoint_name : null
  description = "The storybook CDN endpoint name."
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
  value       = local.apim_base_url
  description = "A concat of the APIM gateway URL and the API path."
}

output "myaccounts_home_url" {
  value       = var.environment_prefix == "prod" ? "https://my.bestinvest.co.uk/dashboard" : "https://my.demo2.bestinvest.co.uk/dashboard"
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
  value       = var.environment_prefix == "staging" || var.environment_prefix == "prod" ? azurerm_app_configuration.app_config[0].primary_read_key : null
  description = "Azure app configuration read key for either staging or prod"
}
