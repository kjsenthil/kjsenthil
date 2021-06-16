output "name" {
  value       = azurerm_api_management.api.name
  description = "Name of the API management service."
}

output "id" {
  value       = azurerm_api_management.api.id
  description = "ID of the API management service."
}

output "management_api_url" {
  value       = azurerm_api_management.api.management_api_url
  description = "Management API URL of the API management service."
}

output "public_ip_addresses" {
  value       = azurerm_api_management.api.public_ip_addresses
  sensitive   = true
  description = "Public IP addresses of the API management service."
}

output "publisher_email" {
  value       = azurerm_api_management.api.publisher_email
  description = "Publishers email for the API management service."
}

output "publisher_name" {
  value       = azurerm_api_management.api.publisher_name
  description = "Publishers name for the API management service."
}

output "gateway_url" {
  value       = azurerm_api_management.api.public_ip_addresses
  description = "Gateway URL for the API management service."
}

output "principal_id" {
  value       = azurerm_api_management.api.identity.0.principal_id
  description = "system identity principal_id for the API management service."
}