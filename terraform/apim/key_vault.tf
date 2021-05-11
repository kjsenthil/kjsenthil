module "key_vault" {
  source              = "../modules/key_vault"
  resource_group_name = var.resource_group_name
  location            = var.location
  name                = "kv-${local.short_location}-${var.environment_prefix}-dh"
  tags                = merge(var.tags, local.default_tags)
  principal_id        = module.apim.principal_id
} 