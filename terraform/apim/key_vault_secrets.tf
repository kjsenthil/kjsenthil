resource "azurerm_key_vault_secret" "myaccount_signing_key" {
  name         = "myaccount-signing-key"
  value        = var.myaccount_signing_key
  content_type = "signing-key"
  key_vault_id = module.key_vault.id
}

resource "azurerm_key_vault_secret" "xplan_username" {
  name         = "xplan-username"
  value        = var.xplan_username
  content_type = "username"
  key_vault_id = module.key_vault.id
}

resource "azurerm_key_vault_secret" "xplan_password" {
  name         = "xplan-password"
  value        = var.xplan_password
  content_type = "password"
  key_vault_id = module.key_vault.id
}

resource "azurerm_key_vault_secret" "myaccount_guest_username" {
  name         = "myaccount-guest-username"
  value        = var.myaccount_guest_username
  content_type = "username"
  key_vault_id = module.key_vault.id
}

resource "azurerm_key_vault_secret" "myaccount_guest_password" {
  name         = "myaccount-guest-password"
  value        = var.myaccount_guest_password
  content_type = "password"
  key_vault_id = module.key_vault.id
}
