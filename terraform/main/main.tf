# The base API Management service, only deployed once per environment.
module "apim" {
  source              = "../modules/api_management"
  count               = var.is_apim == true ? 1 : 0
  environment         = var.environment
  resource_group_name = var.rg_name
}


# The API deployed on every PR
module "apima" {
  source              = "../modules/api_management_api"
  count               = var.is_apima == true ? 1 : 0
  environment_prefix  = var.environment_prefix
  resource_group_name = var.rg_name
  api_management_name = var.apim_name
  depends_on          = [module.apim]
}