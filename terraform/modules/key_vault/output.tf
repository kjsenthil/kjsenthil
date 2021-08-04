output "id" {
  value       = azurerm_key_vault.key_vault.id
  description = "ID of the key vault."
}

output "private_uri" {
  value       = format("https://%s.%s/", azurerm_private_dns_a_record.keyvault_dns_a_record.name, azurerm_private_dns_zone.keyvault_dns_private.name)
  description = "private link url of the key vault."
}
