output "web_host" {
  value       = azurerm_storage_account.this.primary_web_host
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
