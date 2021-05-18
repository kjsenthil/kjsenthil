output "url" {
  description = "URL of the CDN endpoint created"
  value       = "https://${azurerm_cdn_endpoint.storage_account.host_name}"
}
