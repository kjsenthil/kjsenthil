output "apim_name" {
  value       = module.apim.name
  description = "Mame of the APIM created"
}

output "apim_vnet_name" {
  value       = azurerm_virtual_network.this.name
  description = "Name of the VNet which houses APIM"
}

output "apim_subnet_name" {
  value       = azurerm_subnet.apim_external_subnet.name
  description = "Name of the subnet which houses APIM"
}

output "cdn_profile_website_name" {
  value       = azurerm_cdn_profile.website.name
  description = "Name of the CDN profile for the frontend website created for this environment"
}

output "cdn_profile_storybook_name" {
  value       = azurerm_cdn_profile.storybook.name
  description = "Name of the CDN profile for storybook created for this environment"
}

output "app_insights_name" {
  value       = azurerm_application_insights.app_insights.name
  description = "Name of the application insights"
}
