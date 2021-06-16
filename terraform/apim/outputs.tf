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

output "cdn_profile_name" {
  value       = module.cdn_profile.name
  description = "Name of the CDN profile created for this environment"
}

output "app_insights_name" {
  value       = azurerm_application_insights.app_insights.name
  description = "Name of the application insights"
}
