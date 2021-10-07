output "web_host" {
  value       = module.cdn.host_name
  description = "Hostname for the CDN which fronts the storage account"
}

output "web_endpoint" {
  value       = module.cdn.url
  description = "Web endpoint for the CDN which fronts the storage account"
}

output "name" {
  value       = azurerm_storage_account.this.name
  description = "Name of the static storage account"
}

output "cdn_endpoint_name" {
  value       = module.cdn.name
  description = "Endpoint name of the CDN which fronts the storage account"
}
