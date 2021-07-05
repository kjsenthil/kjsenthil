output "public_dns_parent_zone" {
  value       = azurerm_dns_zone.public_dns_parent_zone
  description = "Information relating to the parent public DNS zone"
}

output "public_dns_child_zone" {
  value       = azurerm_dns_zone.public_dns_child_zone
  description = "Information relating to the child public DNS zone"
}