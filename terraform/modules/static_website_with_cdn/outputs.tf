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

output "website_cname_record" {
  value       = azurerm_dns_cname_record.cdn[*].fqdn
  description = "Web endpoint friendly alias (cname) DNS record name"
}

output "custom_domain_id" {
  value       = azurerm_cdn_endpoint_custom_domain.friendly_dns[*].id
  description = "custom domain ID for the CDN endpoint"
}

output "cdn_endpoint_name" {
  value       = module.cdn.name
  description = "Endpoint name of the CDN which fronts the storage account"
}
