(function () {
    'use strict';

    var tmdb_proxy = {
      name: 'TMDB Proxy',
      version: '1.0.1',
      description: 'Проксирование постеров и API сайта TMDB',
      path_image: 'imagetmdb.com/',
      path_api: 'apitmdb.' + (Prisma.Manifest ? Prisma.Manifest.cub_domain : 'cub.red') + '/3/'
    };
    Prisma.SettingsApi.addParam({
      component: 'tmdb',
      param: {
        name: 'tmdb_protocol',
        type: 'select',
        values: {
          http: 'HTTP',
          https: 'HTTPS'
        },
        "default": 'https'
      },
      field: {
        name: Prisma.Lang.translate('torrent_error_step_3')
      },
      onChange: function onChange() {}
    });
    Prisma.TMDB.image = function (url) {
      var base = Prisma.Utils.protocol() + 'image.tmdb.org/' + url;
      return Prisma.Storage.field('proxy_tmdb') ? Prisma.Storage.field('tmdb_protocol') + '://' + tmdb_proxy.path_image + url : base;
    };
    Prisma.TMDB.api = function (url) {
      var base = Prisma.Utils.protocol() + 'api.themoviedb.org/3/' + url;
      return Prisma.Storage.field('proxy_tmdb') ? Prisma.Utils.protocol() + tmdb_proxy.path_api + url : base;
    };
    Prisma.Settings.listener.follow('open', function (e) {
      if (e.name == 'tmdb') {
        e.body.find('[data-parent="proxy"]').remove();
      }
    });
    console.log('TMDB-Proxy', 'started, enabled:', Prisma.Storage.field('proxy_tmdb'));

})();
