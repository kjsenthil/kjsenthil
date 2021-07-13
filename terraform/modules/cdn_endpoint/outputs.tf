output "url" {
  description = "URL of the CDN endpoint created"
  value       = "https://${azurerm_cdn_endpoint.storage_account.host_name}"
}

output "cdn_id" {
  description = "ID of the CDN endpoint created"
  value       = azurerm_cdn_endpoint.storage_account.id
}