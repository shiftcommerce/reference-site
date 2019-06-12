resource "heroku_config" "fastly" {
  vars = {
    FASTLY_IP_LIST = "${join(",", data.fastly_ip_ranges.fastly.cidr_blocks)}"
  }
}

resource "heroku_app_config_association" "fastly" {
  app_id = "${var.heroku_app_name}"

  vars = "${heroku_config.fastly.vars}"
}
