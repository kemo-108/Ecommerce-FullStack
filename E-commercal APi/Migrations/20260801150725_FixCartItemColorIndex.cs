using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_commercal_APi.Migrations
{
    /// <inheritdoc />
    public partial class FixCartItemColorIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartItems_UserId_ProductId",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_UserId_ProductId_ColorName",
                table: "CartItems",
                columns: new[] { "UserId", "ProductId", "ColorName" },
                unique: true,
                filter: "[ColorName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartItems_UserId_ProductId_ColorName",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_UserId_ProductId",
                table: "CartItems",
                columns: new[] { "UserId", "ProductId" },
                unique: true);
        }
    }
}
