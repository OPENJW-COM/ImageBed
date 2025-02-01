using Microsoft.Extensions.FileProviders;
using System.Configuration;
using 图床;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.WebHost.UseUrls("http://*:8378");
var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(t =>
{
    t.AllowAnyHeader();
    t.AllowAnyMethod();
    t.AllowAnyOrigin();
});
dbParam.sqladdress = app.Configuration.GetValue<string>("MysqlAddress");
dbParam.sqlport = app.Configuration.GetValue<int>("MysqlPort");
dbParam.database = app.Configuration.GetValue<string>("MysqlDataBase");
dbParam.user = app.Configuration.GetValue<string>("MysqlUser");
dbParam.password = app.Configuration.GetValue<string>("MysqlPass");
dbParam.url = app.Configuration.GetValue<string>("url");
dbParam.conn = $"server={dbParam.sqladdress};port={dbParam.sqlport};database={dbParam.database};uid={dbParam.user};pwd={dbParam.password};";

// 提供静态文件服务
app.UseStaticFiles();  // 默认处理 wwwroot 文件夹

// 添加自定义静态文件路径
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(AppContext.BaseDirectory + "files"),
    RequestPath = "/files"  // 通过 /uploads 访问 up/ 文件夹中的文件
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
