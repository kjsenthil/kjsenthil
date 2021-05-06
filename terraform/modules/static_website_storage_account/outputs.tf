output "primary_web_endpoint" {
  value       = azurerm_storage_account.static_website_storage_account.primary_web_endpoint
  description = "The primary web endpoint for the static webhosting storage account."
}

output "name" {
  value       = azurerm_storage_account.static_website_storage_account.name
  description = "The name of the static webhosting storage account."
}