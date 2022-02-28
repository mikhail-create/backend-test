import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle('Ecab')
        .setDescription('Documentation of REST API')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    
    await app.listen(PORT, () => {console.log(`Server started at ${PORT}`);
});
}
bootstrap();
